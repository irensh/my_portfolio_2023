//==========GET portfolio IDs============
let isOpen = false;

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
        const rightPanel = document.querySelector('#right-panel');
        const dataIdLabel = $(this).data('id');

        if (!isOpen) {
            isOpen = true;

            rightPanel.style.transform = `translate(88%, 0%)`;

            $.ajax({
                method: 'GET',
                url: createURL(`${dataIdLabel}`),
                success: (data) => {displayContent(data, dataIdLabel)},
                error: onLoadError
            });

        } else {
            isOpen = false;
            rightPanel.style.transform = `translate(0%, 0%)`;
            // console.log(this.textContent);
        }
    }

    function displayContent(data, dataIdLabel) {
        console.log(data);

        const $ul = $('#wrapper-list ul');
              $ul.empty();
        
        $('#header').text(dataIdLabel);

        switch (dataIdLabel) {
            case 'Certificates':
                data.forEach(row => {
                    if (row) {
                        const $li = $('<li>');
                        const $a = $(`<a target="_blansk" href="${row.link}">${row.subject}</a>`);
                        $ul.append($li.append($a));
                    }
                });
                break;
            case 'Education':
                data.forEach(row => {
                    if (row) {
                        const $li = $(`<li>${row}</li>`);
                        $ul.append($li);
                    }
                });
                break;
            case 'Experience':
                data.forEach(row => {
                    if (row) {
                        const $li = $(`<li>${row.company}</li>`);
                        console.log('row.company');
                        // const $ul2 = $('<ul>');
                        // const $li2 = $()
                        $ul.append($li);
                    }
                });
                break;
            case 'Projects':
                console.log('Projectssssss');
                break;
            case 'Skills':
                console.log('Skillssssss');
                break;
        }
    }

    function onLoadError(error) {
        console.log(error);
    }
}