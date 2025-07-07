
function Question({ question, questionID, selectedAnswer, onAnswerChange }) {
    // We'll use a consistent set of option values and labels
    const options = [
        { value: 'strongly_disagree', label: 'Strongly Disagree' },
        { value: 'disagree', label: 'Disagree' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'agree', label: 'Agree' },
        { value: 'strongly_agree', label: 'Strongly Agree' },
    ];

    return (
        <div className="question-container">
            <div className="statement">
                <p>{question}</p>
            </div>
            <div className="answer-choice-container">
                {options.map(option => (
                    <div className="answer-option" key={option.value}>
                        <label>{option.label}</label>
                        <input
                            type="radio"
                            name={`answer-${questionID}`}
                            value={option.value}
                            checked={selectedAnswer === option.value}
                            onChange={() => onAnswerChange(questionID, option.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Question;