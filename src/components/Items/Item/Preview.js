import React from 'react';

class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    const { file } = this.props;

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        this.setState({ image: fileReader.result });
      }
    }
  }


  render() {
    const { image } = this.state;
    const { file } = this.props;

    if(!image) {
      return <div>LOADING...</div>
    }

    return (
      <div>
        <img src={image} alt={file.name.substr(0, 10)} width={200} />
      </div>
    );
  }
}

export default Preview;