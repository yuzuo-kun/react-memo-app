import { useEffect, useState } from 'react'
import './App.css'
import MemoSearch from './components/MemoSearch'
import MemoInput from './components/MemoInput'
import MemoList from './components/MemoList'
import { DragDropContext } from '@hello-pangea/dnd'

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  
  const getInitialMemos = () => {
    const savedMemos = JSON.parse(localStorage.getItem("memos")) || [];
    return savedMemos;
  };

  const [memos, setMemos] = useState(getInitialMemos());

  useEffect(() => {
  }, []);

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
    updateTags(memos);
  }, [memos]);

  const updateTags = (memoList) => {
    const tagSet = new Set(memoList.map((memo) => memo.tag).filter((tag) => tag));
    setTags([...tagSet]);
  };

  const addMemo = (text, tag) => {
    if(!text.trim()) return;
    const newMemos = [...memos, {id: Date.now().toString(), text, tag}];
    setMemos(newMemos);
  };

  const deleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  const editMemo = (id, newText, newTag) => {
    setMemos(memos.map((memo) => (memo.id === id ? {...memo, text: newText, tag: newTag} : memo)));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const reorderedMemos = Array.from(memos);
    const [movedItem] = reorderedMemos.splice(result.source.index, 1); // 配列から要素を取得
    reorderedMemos.splice(result.destination.index, 0, movedItem); // 正しい位置に挿入
  
    setMemos(reorderedMemos);
  
    // ローカルストレージを更新
    localStorage.setItem("memos", JSON.stringify(reorderedMemos));
  };
  

  return (
    <div className="app">
      <h1 className="app-title">メモアプリ</h1>
      <MemoSearch setSearchText={setSearchText} setSelectedTag={setSelectedTag} tags={tags} />
      <MemoInput addMemo={addMemo} tags={tags} />
      <DragDropContext onDragEnd={handleDragEnd}>
      <MemoList
        memos={memos}
        deleteMemo={deleteMemo}
        editMemo={editMemo}
        searchText={searchText}
        selectedTag={selectedTag}
      />
      </DragDropContext>
    </div>
  )
}

export default App
