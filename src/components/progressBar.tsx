import '../progressBar.css'

const ProgressBar = (props: any) => {
  const { bgcolor, completed } = props;

  const fillerWidth: any = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  }

  const labelStyles: any = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div className='containerStyles'>
      <div className='fillerStyles' style={fillerWidth}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;