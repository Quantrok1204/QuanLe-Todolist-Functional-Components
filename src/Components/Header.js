import React, { useState } from "react"
import Todos from "./Todos"
import Footer from "./Footer";

const filterStatusTodo = (datas = [], s = '') => {
    switch (s) {
      case 'Active':
        return datas.filter(item => !item.status)
      case 'Completed':
        return datas.filter(item => item.status)
      default:
        return datas
    }
  }

const Header = () => {

    // const getStorage = JSON.parse(localStorage.getItem('key'))
    const [data, setData] = useState('')
    const [datas, setDatas] = useState([])
    const [todoEditing, setEdit] = useState('')
    const [status, setStatusTodo] = useState('All')

    React.useEffect(() => {
        const getStorage = localStorage.getItem("key");
        const updateTodos = JSON.parse(getStorage);
        if (updateTodos) {
          setDatas(updateTodos);
        }
      }, []);
    
    React.useEffect(() => {
        const setStorage = JSON.stringify(datas);
        localStorage.setItem("key", setStorage);
      }, [datas]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            text: data,
            status: false,
        };
        // setDatas(datas => {
        //     const newData  = [...datas, newTodo]
        //     const setStorage = JSON.stringify(newData)
        //     localStorage.setItem('key', setStorage)
        //     return newData 
        // })
        setDatas([...datas].concat(newTodo));
        setData('');
    }

    const handleRemove = (id) => {
        let updateDatas = [...datas].filter((data) => data.id !== id)
        setDatas(updateDatas);
      };

    const handleChecked = (id) => {
        let updateDatas = [...datas].map((data) => {
            if (data.id === id) {
                data.status = !data.status;
            }
            return data;
        });
        setDatas(updateDatas);
    };

    const getEdit = (id = '') => {
        const todoEditingId = id
        setEdit (todoEditingId)
      }

    const editTodo = (data, index) => {
        datas.splice(index, 1, data);
        setDatas(datas);
    }
    
    const setFilter = (s) => {
        setStatusTodo(s)
      }

    const handleSelectAll = (e) => {
        let selectAll = [...datas];
        selectAll.forEach(datas => (datas.status = e.target.checked));
        setDatas(selectAll);
    };

    const handleClearCompleted = () => {
        let newData = [];
        const getStorage = JSON.parse(localStorage.getItem('key'))
        for(let i=0 ; i< getStorage.length; i++) {
            if(getStorage[i].status === false) {
                newData.push(getStorage[i]);
            }
        }
        setDatas(newData);
    };
   
  return (
    <div className="toDoMain">
        <form>
            <label className="label">
                <input className="input" placeholder="  Add New Todo..." 
                    type="text" value={data}
                    onChange={(e) => setData(e.target.value)}/>
            </label>
                <button className="submit" onClick={handleSubmit}></button>
        </form><hr/>
        <input type="checkbox" className="select" value="checkedall"
            onClick={handleSelectAll}
        /><label className="selectall">Select All</label><hr/>
        <Todos 
            datas={filterStatusTodo(datas, status)}
            handleRemove={handleRemove}
            handleChecked={handleChecked}
            todoEditing={todoEditing}
            getEdit={getEdit}
            editTodo={editTodo}
        /><hr/>
        <Footer 
            setFilter={setFilter}
            clickButton={status}
            handleClearCompleted={handleClearCompleted}
        />
    </div>
  );
}

export default Header;