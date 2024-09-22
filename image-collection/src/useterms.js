export async function ShowTerms(useTerms, onAccept, onRefuse) {
    useTerms.sort((a, b) => a.index - b.index);
    const parent = document.getElementById('terms-list');
    const template = parent.firstElementChild;
    parent.removeChild(template);
    template.removeAttribute('id');

    useTerms.forEach((el) => {
        addTerm(el, template, parent);
    });

    document.getElementById('accept-btn-handler').addEventListener('click', onAccept);
    document.getElementById('refuse-btn-handler').addEventListener('click', onRefuse);
}

function addTerm(term, template, parent) {
    const node = template.cloneNode(true);
    const title = node.getElementsByClassName('use-term-title')[0];
    const text = node.getElementsByClassName('use-term-text')[0];
    title.textContent = term.title;
    text.textContent = term.content ?? term.text;
    parent.appendChild(node);
}