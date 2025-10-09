
function Body(){
    return (
        <div className = "pg-body">
            <input className = "text-input" type="text" id="text-input" placeholder="Enter text here..."/>
            <span className = "emotion-output" id="emotion-output">Emotion</span>
            <button className = "predict-button" id="predict-button" py-click="run_prediction">Predict Emotion</button>
        </div>
    );
}

export default Body;