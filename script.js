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

        } else if (dataIdLabel === 'Projects') {

        } else if (dataIdLabel === 'Skills') {

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
            const $hr = $('<br>');
            // const $hr = $('<hr>');
            

            $divContentInfo.append($div
                .append($h3)
                .append($p)
                .append($hr));
        })

        // const $last = $divContentInfo.children().last();
        // $last.children().last().remove();
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