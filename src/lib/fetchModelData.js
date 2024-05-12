/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }

            if (this.status !== 200) {
                reject(new Error({status: this.status, statusText: this.statusText}));

            }

            if (this.readyState === 4 && this.status === 200) {
                resolve({data: JSON.parse(this.responseText)});
            }
        };
        request.open("GET", url, true);
        request.send();
    });
}

export default fetchModel;
