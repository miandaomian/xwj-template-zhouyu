import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { listValue } from '../assets/data'

import styles from "./index.module.less";

const App = () => {
  interface lisetValueProps {
    id: number;
    desc: string;
    create_date: string;
    changeList: string;
  }
  const [mainList, setMainList] = useState<lisetValueProps[]>([])
  useEffect(() => {
    // 时间倒序，当属性changeList为1时在第一个列表，为2时在第二个列表
    let list = listValue.sort((a, b) => (a.create_date < b.create_date ? 1 : -1)).map((item) => ({ ...item, changeList: '1' }))
    setMainList(list)
  }, []);
  const changeListHandle = (action: string, id: number) => {
    let list = mainList.map((item: lisetValueProps) => {
      if (item.id === id) {
        return {
          ...item,
          changeList: action === 'add' ? '2' : '1'
        }
      }
      return item
    })
    setMainList(list)

  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.listBox}>
          {mainList.map((item: lisetValueProps) => {
            return item.changeList === '1' && <div key={'add' + item.id} className={styles.itemBox}>
              <div className={styles.textItem}>
                <span>ID:{item.id}</span>
                <span style={{ flex: 1 }}>{item.desc}</span>
                <span className={styles.createDate}>Create Date:{item.create_date}</span>
              </div>
              <Button onClick={() => { changeListHandle('add', item.id) }}>
                ADD
              </Button>
            </div>
          })}
        </div>
        <div className={styles.listBox}>
          {mainList.map((item: lisetValueProps) => {
            return item.changeList === '2' && <div key={'remove' + item.id} className={styles.itemBox}>
              <div className={styles.textItem}>
                <span>ID:{item.id}</span>
                <span style={{ flex: 1 }}>{item.desc}</span>
                <span className={styles.createDate}>Create Date:{item.create_date}</span>
              </div>
              <Button onClick={() => { changeListHandle('remove', item.id) }}>
                REMOVE
              </Button>
            </div>
          })}
        </div>
      </div>
    </>
  );
};

export default App;
