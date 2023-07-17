import * as Icons from "@components/UI/icons";

export const DetailHeader = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='startDate space-x-2'>
        <label>出差日期(起)</label>
        <input type='text' />
      </div>
      <div className='endDate space-x-2'>
        <label>出差日期(迄)</label>
        <input type='text' />
      </div>
      <button
        type='button'
        className='flex items-center justify-center gap-1'
      >
        <Icons.ShowDetail />
        詳細資料
      </button>
    </div>
  );
};
