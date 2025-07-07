import Question from "./Question.jsx";
import { React, useState, useRef, useEffect } from 'react';

const questions = [
    {'question': 'True knowledge about the world can ultimately be found through objective observation and scientific methods, independent of personal feelings or beliefs.', 'category': 'epistemology', 'order': 1},
    {'question': 'Our personal experiences and cultural background fundamentally shape what we can know and how we interpret information.', 'category': 'epistemology', 'order': -1},
    {'question': 'If enough people believe something to be true, it makes it true for them, regardless of external evidence.', 'category': 'epistemology', 'order': -1},
    {'question': 'Reason and logic are universal tools that, when properly applied, can lead anyone to the same objective truths.', 'category': 'epistemology', 'order': 1},
    {'question': "What one person considers 'knowledge' might not be considered knowledge by another, and both could be equally valid.", 'category': 'epistemology', 'order': -1},
    {'question': 'We can never truly know reality as it is, only our own interpretations of it.', 'category': 'epistemology', 'order': -1},
    {'question': 'Scientific discoveries provide increasingly accurate, universal truths about how the world works.', 'category': 'epistemology', 'order': 1},
    {'question': 'Knowledge is primarily a social construct, evolving through shared language and collective understanding.', 'category': 'epistemology', 'order': -1},
    {'question': 'Everything that truly exists can, in principle, be understood or explained through physical laws and scientific investigation.', 'category': 'ontology', 'order': 1},
    {'question': 'Consciousness and thoughts are just products of complex brain activity, nothing more.', 'category': 'ontology', 'order': 1},
    {'question': 'There are non-physical aspects of reality, such as spirits, souls, or universal consciousness, that exist independently of matter.', 'category': 'ontology', 'order': -1},
    {'question': 'Ultimately, the universe might be best understood as a giant system of interconnected ideas or information, rather than physical stuff.', 'category': 'ontology', 'order': -1},
    {'question': 'If something cannot be measured or empirically observed, it likely does not exist in any meaningful way.', 'category': 'ontology', 'order': 1},
    {'question': "The 'real' world outside of our minds is exactly as our senses perceive it to be.", 'category': 'ontology', 'order': 1},
    {'question': 'The fundamental nature of reality is mental or spiritual, with the physical world being a manifestation of it.', 'category': 'ontology', 'order': -1},
    {'question': 'There is an objective reality that would exist even if no conscious beings were around to perceive it.', 'category': 'ontology', 'order': 1}
];

const responseValues = {
    'strongly_disagree': -2,
    'disagree': -1,
    'neutral': 0,
    'agree': 1,
    'strongly_agree': 2,
};

function Display() {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const canvasRef = useRef(null);

    const AXIS_RANGE = 2.0;

    const handleAnswerChange = (questionID, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionID]: value,
        }));
        
        setScore(null);
        setShowResults(false);
    };

    const handleSubmit = () => {
        let epiTotal = 0;
        let ontTotal = 0;
        let allAnswered = true;

        let epiQuestionCount = 0;
        let ontQuestionCount = 0;

        for (let i = 0; i < questions.length; i++) {
            const selectedValue = answers[i];
            if (selectedValue === undefined) {
                allAnswered = false;
                break;
            }

            const answerValue = questions[i].order * responseValues[selectedValue];
            if (questions[i].category === "epistemology") {
                epiTotal += answerValue;
                epiQuestionCount++;
            } else {
                ontTotal += answerValue;
                ontQuestionCount++;
            }
        }

        if (!allAnswered) {
            console.log("error: must answer all questions");
            alert("please answer all questions before submitting.");
            return;
        }

        epiTotal /= 16.0;
        ontTotal /= 16.0;

        setScore([epiTotal, ontTotal]);
        setShowResults(true);
        console.log(`Scores: Epistemology=${epiTotal}, Ontology=${ontTotal}`);
    };

    useEffect(() => {
        if (showResults && score !== null) {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            const CANVAS_WIDTH = 600;
            const CANVAS_HEIGHT = 400;
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;

            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            const centerX = CANVAS_WIDTH / 2;
            const centerY = CANVAS_HEIGHT / 2;

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(CANVAS_WIDTH, centerY);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, CANVAS_HEIGHT);
            ctx.stroke();

            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillText('Materialism', centerX, 20);
            ctx.fillText('Idealism', centerX, CANVAS_HEIGHT - 20);

            ctx.textAlign = 'left';
            ctx.fillText('Subjective', 10, centerY-10);
            ctx.textAlign = 'right';
            ctx.fillText('Objective', CANVAS_WIDTH - 10, centerY-10);

            const [epiScore, ontScore] = score; 

            const plotMinX = 50;
            const plotMaxX = CANVAS_WIDTH - 50;
            const mappedX = plotMinX + ((plotMaxX - plotMinX) / (AXIS_RANGE - (-AXIS_RANGE))) * (ontScore - (-AXIS_RANGE));

            const plotMinY = CANVAS_HEIGHT - 50;
            const plotMaxY = 50;
            const mappedY = plotMinY + ((plotMaxY - plotMinY) / (AXIS_RANGE - (-AXIS_RANGE))) * (epiScore - (-AXIS_RANGE));

            ctx.beginPath();
            ctx.arc(mappedX, mappedY, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.strokeStyle = 'darkred';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = 'blue';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(`(${ontScore.toFixed(2)}, ${epiScore.toFixed(2)})`, mappedX, mappedY - 10);

        }
    }, [showResults, score, AXIS_RANGE]);

    return (
        <div className="vignette">
            {showResults ? (
                <>
                    <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }}></canvas>
                    {score && (
                        <div className="total-score" style={{marginTop: '10px'}}>
                            <h3>Epistemology: {score[0].toFixed(2)}</h3>
                            <h3>Ontology: {score[1].toFixed(2)}</h3>
                        </div>
                    )}
                    <button className="submit-button" onClick={() => setShowResults(false)} style={{marginTop: '20px'}}>
                        Go Back to Questions
                    </button>
                </>
            ) : (
                <>
                    {questions.map((q, i) => (
                        <Question
                            question={q.question}
                            key={i}
                            questionID={i}
                            selectedAnswer={answers[i]}
                            onAnswerChange={handleAnswerChange}
                        />
                    ))}

                    <button className="submit-button" onClick={handleSubmit}>
                        Submit Answers
                    </button>
                </>
            )}
        </div>
    );
}

export default Display;