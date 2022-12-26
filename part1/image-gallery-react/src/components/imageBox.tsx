function ImageBox(props:{
    src: string;
}) {
    return (
        <div className="image-box">
            <img src={props.src} alt="img" />
        </div>
    );
}

export default ImageBox;