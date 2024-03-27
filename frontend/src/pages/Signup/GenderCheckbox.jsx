import React from 'react'

const GenderCheckbox = ({onCheckboxSelect,selectedGender}) => {
  return (
    <div className='flex gap-3'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected": ""}`}>
                <span className='label-text' >Male</span>
                <input checked={selectedGender==="male"} onChange={() => onCheckboxSelect("male")} type="checkbox" className='checkbox border-slate-900' />
            </label>
        </div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
                <span className='label-text' >Female</span>
                <input checked={selectedGender==="female"} onChange={() => onCheckboxSelect("female")} type="checkbox" className='checkbox border-slate-900' />
            </label>
        </div>
    </div>
  )
}

export default GenderCheckbox
