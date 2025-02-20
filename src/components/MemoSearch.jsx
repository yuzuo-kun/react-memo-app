import React from 'react'

function MemoSearch({setSearchText, setSelectedTag, tags}) {
  return (
    <div className='memo-search'>
      <input
        type='text'
        placeholder='メモを検索...'
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select onChange={(e) => setSelectedTag(e.target.value)}>
        <option value="">全てのタグ</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MemoSearch