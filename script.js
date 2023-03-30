const $rightPanel = $('#right-panel');

const closeBtn = $('#close');
closeBtn.on('click', closeRightPanel);

const allShortInfoFa = $('.short-info > p > i.fa');
allShortInfoFa.on('click', closeRightPanel);

const $divContentInfo = $('#content-info');

let isOpen = false;

//==========GET portfolio IDs============

function createURL(collectionOrPath) {
    const baseUrl = 'https://portfolio-80642-default-rtdb.firebaseio.com/';
    return baseUrl + collectionOrPath + '.json'
}

function loadLabelsData() {
    $.ajax({
        method: 'GET',
        url: createURL(''),
        success: getLabelsText,
        error: onLoadError
    });

    function getLabelsText(data) {
        for (const key in data) {
            const $divHolderLabels = $('#holder-labels');
            const $divLabel = $(`<div class="label" data-id="${key}">`);
            $divLabel.text(key);
            $divLabel.on('click', onLoadLabelsContent)

            $divHolderLabels.append($divLabel);
        }
    }

    function onLoadLabelsContent() {
        $("#wrapper-content").animate ({scrollTop: 0}, 600);

        const dataIdLabel = $(this).data('id');

        openRightPanel();

        $.ajax({
            method: 'GET',
            url: createURL(`${dataIdLabel}`),
            success: (data) => { displayContent(data, dataIdLabel) },
            error: onLoadError
        });
    }

    function displayContent(data, dataIdLabel) {
        if (Array.isArray(data) && !data[0]) data.shift();
        console.log(data);

        $divContentInfo.empty();

        $('#header').text(dataIdLabel);

        if (dataIdLabel === 'Certificates') {
            displayCertificates(data);
        } else if (dataIdLabel === 'Education') {
            displayEducation(data);
        } else if (dataIdLabel === 'Experience') {
            displayExperience(data);
        } else if (dataIdLabel === 'Projects') {
            displayProjects(data);
        } else if (dataIdLabel === 'Skills') {
            displaySkills(data);
        }

    }

    function onLoadError(error) {
        console.log(error);
    }


    function displayCertificates(data) {
        data.forEach(row => {
            const link = row.link;
            const subject = row.subject;
            const $p = $(`<p><i class="fa-solid fa-award"></i> <a href="${link}" target="_blank">${subject}</a></p>`);
            $divContentInfo.append($p);
        })
    }

    function displayEducation(data) {
        data.forEach(row => {
            const date = row.date;
            const school = row.school;
            const subject = row.subject;

            const $div = $('<div>');
            const $h3 = $(`<h3>${school} / ${subject}</h3>`);
            const $p = $(`<p><i class="fa-regular fa-calendar-days"></i> ${date}</p>`);
            const $br = $('<br>');

            $divContentInfo.append($div
                .append($h3)
                .append($p)
                .append($br));
        })

        // const $last = $divContentInfo.children().last();
        // $last.children().last().remove();
    }

    function displayExperience(data) {
        data.forEach(row => {
            const company = row.company;
            const date = row.date;
            const description = row.description;
            const position = row.position;
            const website = row.website;

            const $div = $('<div>');
            const $h3 = $(`<h3>${position} / <a href="${website}" target="_blank ">${company}</a></h3>`);
            const $pDate = $(`<p><i class="fa-regular fa-calendar-days"></i> ${date}</p>`);
            const $pDescription = $(`<p>${description}</p>`);
            const $br = $('<br>');

            $divContentInfo.append($div
                .append($h3)
                .append($pDate)
                .append($pDescription)
                .append($br));
        });
    }

    function displayProjects(data) {
        data.forEach(row => {
            const company = row.company;
            const date = row.date;
            const link = row.link;

            const $div = $('<div>');
            const $h3 = $(`<h3>The website of <a href="${link}" target="_blank ">${company}</a></h3>`);
            const $date = $(`<p><i class="fa-regular fa-calendar-days"></i> ${date}</p>`);
            const $br = $('<br>');

            $divContentInfo.append($div
                .append($h3)
                .append($date)
                .append($br));
        });
    }

    function displaySkills(data) {
        data.filter(row => row.hasOwnProperty('Language') === false)
            .forEach(row => {
                createHTML(row);
            });

        // Dispaly Languages
        $divContentInfo.append('<br>')
                        .append('<h2>Languages</h2>')
        data.filter(row => row.hasOwnProperty('Language') === true)[0].Language
            .forEach(row => {
                createHTML(row);
            });
    }

    function createHTML(row) {
        const type = row.type;
        const percent = row.percent;

        const $p = $(`<p>${type}</p>`);
        const $divEmptyBar = $('<div class="empty-bar">');
        const $divPercentBar = $(`<div class="percent-bar">${percent}%</div>`);
              $divPercentBar.css('width', `${percent}%`);

        $divContentInfo.append($p)
                       .append($divEmptyBar
                            .append($divPercentBar));
    }
}

//================== Close right panel ====================
function closeRightPanel() {
    if (isOpen) {
        isOpen = false;
        $rightPanel.css('transform', 'translate(0%, 0%)');
    }
}

function openRightPanel() {
    if (!isOpen) {
        isOpen = true;
        $rightPanel.css('transform', 'translate(88%, 0%)');
    }
}