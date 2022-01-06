import React, {useEffect, useState} from 'react';
import { Button, Menu, Space } from 'antd';
import {window, fs, dialog,notification} from '@tauri-apps/api';
import styles from './index.less';

const IndexPage:React.FC=()=> {
  const [text, setText] = useState<string | null>(null);
  const [size, setSize] = useState<{width:number,height:number} | null>(null);

  useEffect(() => {
    window.appWindow.listen("tauri://resize",({event,payload})=>{
      const {width,height} = payload as any;
      setSize({width,height})
    })
    return () => {
    };
  }, []);


  const onClickReadFie=async ()=>{
    const filePath: any = await dialog.open({});
    const result = await fs.readTextFile(filePath)
    setText(result);
  }

  const onClickSetSize = async() => {
    await window.appWindow.setSize({width:1000,height:800,type:'Physical'})
  }

  const outerSize= async ()=>{
    const result = await window.appWindow.outerSize();
  }

  const onClickMessage = async ()=>{
    /*const hasPerawait = await notification.isPermissionGranted();
    if(!hasPerawait){
      const perResult = await notification.requestPermission();
      console.log('perResult',perResult)
    }*/

    const result =await notification.sendNotification({
      title:'测试通知',
      icon:'success',
      body:'内容主体'
    })
    console.log('onClickMessage',result)
  }

  return (
    <div className={styles.ztPage}>
      <aside className={styles.ztSide}>
        <Menu className={styles.ztMenu} defaultSelectedKeys={['home']} theme={'dark'}>
          <Menu.Item key={'home'}>首页</Menu.Item>
          <Menu.Item key={'my.course'}>我的课程</Menu.Item>
          <Menu.Item key={'about'}>关于</Menu.Item>
        </Menu>
      </aside>
      <main className={styles.ztMain}>
        <Space>
          <Button type={'primary'} onClick={onClickReadFie}>读取文件111</Button>
          <Button onClick={onClickSetSize}>设置高宽 1000*800</Button>
          <Button onClick={onClickMessage}>消息</Button>
        </Space>
        <p className={styles.ztRow}>
          onResize: width {size?.width}, height {size?.height}
        </p>
        <div className={styles.ztFileContainer}>
          {text}
        </div>
      </main>
    </div>
  );
}
export default IndexPage
