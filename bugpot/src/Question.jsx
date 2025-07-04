

function Question() {
    return (
        <>
            <div className="question-container">
                <div className="statement">
                    <p>here is a statement</p>
                </div>
                <div className="answer-choice-container">
                    <div className="answer-option">
                        <label>Strongly Disagree</label>
                        <input type="radio" name="answer" value="strongly_disagree" />
                    </div>
                    <div className="answer-option">
                        <label>Disagree</label>
                        <input type="radio" name="answer" value="disagree" />
                    </div>
                    <div className="answer-option">
                        <label>Neutral</label>
                        <input type="radio" name="answer" value="neutral" />
                    </div>
                    <div className="answer-option">
                        <label>Agree</label>
                        <input type="radio" name="answer" value="agree" />
                    </div>
                    <div className="answer-option">
                        <label>Strongly Agree</label>
                        <input type="radio" name="answer" value="strongly_agree" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Question;