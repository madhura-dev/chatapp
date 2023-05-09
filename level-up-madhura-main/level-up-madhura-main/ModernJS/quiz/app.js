const correctAns = ['B', 'B', 'B', 'B'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');
const marks = document.querySelector('span');

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;
    const userAns = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    //check ans
    userAns.forEach((answer, index) => {
        if (answer === correctAns[index]) {
            score += 25;
        }
    });

    scrollTo(0, 0);

    result.classList.remove('d-none');
    marks.innerText = `${score}%`;

    let op = 0;
    const timer = setInterval(() => {
        marks.innerText = `${op}%`;
        if (op === score) {
            clearInterval(timer);
        }
        else {
            op++;
        }
    }, 10);
});
