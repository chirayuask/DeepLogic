const express = require('express')
const request = require('request')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/getTimeStories", (req, res) => {
    try {
        const options = {
            'method': "GET",
            'url': "https://time.com",
        }
        request(options, function (error, response) {
            if (error) {
                return res.status(400).send(error)
            }
            let resultArr = [];
            const regex3 = RegExp(`<li class="latest-stories__item">`, 'g')
            const regex2 = RegExp(`<h3 class="latest-stories__item-headline">`, 'g')
            const regex1 = RegExp(`<time class="latest-stories__item-timestamp">`, "g",);
            const str1 = String(response.body)
            let startIndex
            let endIndex;
            let zeroIndex;
            let startIndexArr = [];
            let endINdexArr = [];
            let zeroIndexArr = []
            while ((array3 = regex3.exec(str1)) !== null) {
                zeroIndex = regex3.lastIndex
                zeroIndexArr.push(zeroIndex)
            }
            while ((array2 = regex2.exec(str1)) !== null) {
                startIndex = regex2.lastIndex
                startIndexArr.push(startIndex)
            }
            while ((array1 = regex1.exec(str1)) !== null) {
                endIndex = regex1.lastIndex
                endINdexArr.push(endIndex)
            }
            for (let i = 0; i < 6; i++) {
                resultArr.push({
                    title: str1.substring(startIndexArr[i], endINdexArr[i] - 84),
                    link: `https://time.com/${str1.substring(zeroIndexArr[i] + 24, startIndexArr[i] - 61)}`
                })
            }
            console.log(resultArr)
            return res.send(resultArr)

        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})
app.listen(8000, () => {
    console.log("App is listening on port 8000")
})