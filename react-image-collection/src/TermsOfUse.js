function TermsOfUse({ termsOfUse, onAccept, onRefuse }) {
    let terms;
    
    if (termsOfUse) {
        terms = termsOfUse
            .sort((a, b) => a.index - b.index)
            .map((x) => <TermOfUse key={x.index} term={x} />);
    }
    else {
        terms = "Loading terms";
    }

    return (
        <div>
            <ul id="terms-list" className="no-dots">
                {terms}
            </ul>
            <div className="center">
                <p>To get access to image collection accept terms of use </p>
                <div>
                    <button id="accept-btn-handler" onClick={onAccept}>Accept</button>
                    <button id="refuse-btn-handler" onClick={onRefuse}>Refuse</button>
                </div>
            </div>
        </div>
    )
}

function TermOfUse({ term }) {
    return (
        <li id="term-template">
            <h2>{term.index + '. ' + term.title}</h2>
            <p style={{textAlign: "left"}}>{term.content ?? term.text}</p>
        </li>
    )
}

export default TermsOfUse;