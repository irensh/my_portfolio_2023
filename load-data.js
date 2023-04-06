const selectors = {
    rightPanel: '#right-panel',
    divHolderLabels: '#holder-labels',
    wrapperContent: '#wrapper-content',
    closeBtn: '#close',
    header: '#header',
    divContentInfo: '#content-info',
    allShortInfoFa: '.short-info > p > i.fa'
}

class LoadAllText {
    #isOpen;
    #queryUrl;

    constructor() {
        this.#isOpen = false;
        this.#queryUrl = 'https://portfolio-80642-default-rtdb.firebaseio.com/.json';
        this.collections = {};
    }

    init() {
        this.getData();
    }

    async getData() {
        try {
            let response = await fetch(this.#queryUrl, {
                method: 'GET'
            });

            this.collections = await response.json();

            // console.log(this.collections);

            this.renderLabels();
        } catch (error) {
            alert(error.message);
        }
    }

    renderLabels() {
        const { divHolderLabels } = selectors;

        for (const key in this.collections) {
            const $divLabel = $(`<div class="label" data-id="${key}">${key}</div>`);
            $divLabel.on('click', this.renderAllForCurrLabel);
            $divLabel.appendTo(divHolderLabels);
        }
    }

    renderAllForCurrLabel = (event) => {
        const { wrapperContent } = selectors;
        const { closeBtn } = selectors;
        const idLabel = $(event.target).data('id');
        const collection = this.collections[idLabel];

        $(wrapperContent).animate({ scrollTop: 0 }, 600);
        $(closeBtn).on('click', this.closeRightPanel);

        this.renderContent(idLabel, collection);
        this.openRightPanel();
    }

    renderContent = (idLabel, collection) => {
        if (Array.isArray(collection) && !collection[0]) data.shift();

        const { divContentInfo } = selectors;
        $(divContentInfo).empty();

        const { header } = selectors;
        $(header).text(idLabel);

        if (idLabel === 'Certificates') {
            this.renderCertificates(collection, $(divContentInfo));
        } else if (idLabel === 'Education') {
            this.renderEducation(collection, $(divContentInfo));
        } else if (idLabel === 'Experience') {
            this.renderExperience(collection, $(divContentInfo));
        } else if (idLabel === 'Projects') {
            this.renderProjects(collection, $(divContentInfo));
        } else if (idLabel === 'Skills') {
            this.renderSkills(collection, $(divContentInfo));
        }
    }

    renderCertificates = (collection, divContentInfo) => {
        collection.forEach(row => {
            const link = row.link;
            const subject = row.subject;
            const $h3 = $(`<h3><i class="fa-solid fa-award"></i> <a href="${link}" target="_blank">${subject}</a></h3>`);
            divContentInfo.append($h3);
        })
    }

    renderEducation = (collection, divContentInfo) => {
        collection.forEach(row => {
            const date = row.date;
            const school = row.school;
            const subject = row.subject;

            const $div = $(`
                    <div>
                        <h3>${school} / ${subject}</h3>
                        <p><i class="fa-regular fa-calendar-days"></i> ${date}</p>
                        <br>
                    </div>
                `);

            divContentInfo.append($div);
        });
    }

    renderExperience = (collection, divContentInfo) => {
        collection.forEach(row => {
            const company = row.company;
            const date = row.date;
            const description = row.description;
            const position = row.position;
            const website = row.website;

            const $div = $(`
                    <div>
                        <h3>${position} / <a href="${website}" target="_blank ">${company}</a></h3>
                        <p><i class="fa-regular fa-calendar-days"></i> ${date}</p>
                        <p>${description}</p>
                        <br>
                    </div>
                `);

            divContentInfo.append($div);
        });
    }

    renderProjects = (collection, divContentInfo) => {
        collection.forEach(row => {
            const company = row.company;
            const date = row.date;
            const link = row.link;

            const $div = $(`
                    <div>
                        <h3>The website of <a href="${link}" target="_blank ">${company}</a></h3>
                        <p><i class="fa-regular fa-calendar-days"></i> ${date}</p>
                        <br>
                    </div>
                `);

            divContentInfo.append($div);
        });
    }

    renderSkills = (collection, divContentInfo) => {
        collection.filter(row => row.hasOwnProperty('Language') === false)
            .forEach(row => {
                createHTML(row);
            });

        // Dispaly Languages
        divContentInfo.append('<br><h2>Languages</h2>');
        collection.filter(row => row.hasOwnProperty('Language') === true)[0].Language
            .forEach(row => { createHTML(row); });

        function createHTML(row) {
            const type = row.type;
                const percent = row.percent;

                const $domElements = $(`
                        <p>${type}</p>
                        <div class="empty-bar">
                        <div class="percent-bar" style="width: ${percent}%;">${percent}%</div>
                        </div>
                    `);

                divContentInfo.append($domElements);
        }
    }


    openRightPanel = () => {
        if (!this.#isOpen) {
            this.#isOpen = true;

            const { rightPanel } = selectors;
            $(rightPanel).css('transform', 'translate(88%, 0%)');
        }
    }

    closeRightPanel = () => {
        if (this.#isOpen) {
            this.#isOpen = false;

            const { rightPanel } = selectors;
            $(rightPanel).css('transform', 'translate(0%, 0%)');
        }
    }

}

const loadLabels = new LoadAllText();
loadLabels.init();