fetch('assets/threads.svg')
    .then(response => response.text())
    .then(svgData =>
    {
        for (let i = 0; i < 100; i++)
        {
            insertSVG(svgData, 'body')
        }

    })

function insertSVG(svgData, containerId)
{
    const container = document.querySelector(containerId);
    const svgWrapper = document.createElement('div');
    svgWrapper.className = 'svg-wrapper';
    const svgContainer = document.createElement('div');

    const randomX = Math.random() * (window.innerWidth - 50);
    const randomY = window.innerHeight + 150;
    svgWrapper.style.left = randomX + 'px';
    svgWrapper.style.top = randomY + 'px';
    svgWrapper.style.position = 'absolute';

    const randomRotation = Math.random() * 360;
    svgWrapper.style.transform = `rotate(${randomRotation}deg)`;

    const randomScale = Math.random() * (2 - 0.5) + 0.5;
    svgWrapper.style.transform += ` scale(${randomScale})`;

    const randomDuration = Math.floor(Math.random() * (5 - 2 + 1) + 2);

    const randomDelay = Math.random() * randomDuration;

    svgContainer.style.animation = `moveUp ${randomDuration}s linear ${randomDelay}s infinite`;

    svgContainer.innerHTML = svgData;

    svgWrapper.appendChild(svgContainer);
    container.appendChild(svgWrapper);
}