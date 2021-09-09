(() => {
    // Assign Data-Index
    const graphicElements = document.querySelectorAll('.graphic-item')
    const stepElements = document.querySelectorAll('.step')
    const length = stepElements.length;

    for (let i = 0; i < length; i++) {
        stepElements[i].dataset.index = i;
        graphicElements[i].dataset.index = i;
    }

    // Birds Transition
    const actions = {
        birdFlies(activate) {
            const bird = document.querySelector('[data-index="2"] > .bird')
            activate ?
                bird.style.transform = `translateX(${window.innerWidth}px)` :
                bird.style.transform = `translateX(-100%)`
        },

        birdFlies2(activate) {
            const bird = document.querySelector('[data-index="5"] > .bird')
            activate ?
                bird.style.transform = `translate(${window.innerWidth * 3}px, ${-window.innerHeight * 2.1}px)` :
                bird.style.transform = `translateX(-100%)`
        }
    }

    // Transition
    let currentIdx = 0;

    function getIdx() {
        for (let i = currentIdx - 1; i <= currentIdx + 1; i++) {
            if (i < 0 || i >= stepElements.length) continue
            const topPosition = stepElements[i].getBoundingClientRect().top
            if ((topPosition > window.innerHeight * 0.1) &&
                (topPosition < window.innerHeight * 0.9))
                return stepElements[i].dataset.index
        }
        return currentIdx
    }

    function activateGraphicElement(action) {
        graphicElements[currentIdx].classList.add('visible')
        if (action) {
            actions[action](true)
        }
    }

    function inactivateGraphicElement(action) {
        graphicElements[currentIdx].classList.remove('visible')
        if (action) {
            actions[action](false)
        }
    }

    window.addEventListener('scroll', () => {
        const updatedIdx = getIdx()
        if (currentIdx !== updatedIdx) {
            inactivateGraphicElement(graphicElements[currentIdx].dataset.action)
            currentIdx = updatedIdx
            activateGraphicElement(graphicElements[currentIdx].dataset.action)
        }
    })

    // Initialization
    window.onbeforeunload = () => window.scrollTo(0, 0)
    activateGraphicElement()
})();