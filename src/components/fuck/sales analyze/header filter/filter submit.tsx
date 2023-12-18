interface props {
  disable: boolean;
}
export function FilterSubmit({ disable }: props) {
  return (
    <>
      <input
        type='submit'
        value='Search'
        className=' submitBtn'
        disabled={disable}
      />
    </>
  );
}
