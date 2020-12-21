const AWS = require('aws-sdk');
const fs = require('fs');

const pollyConfig = {
    aws_access_key_id: "AKIAQGJZPPDDJMY6UXE7",
    aws_secret_access_key: "NL93phFB6VqPcs + TSeO0zktnyFEMCw8r1mWj2k5l",
    signatureVersion: "v4",
    region: "us-east-1"
}

function textToSpeech(req) {

    let oggPath = [
        { 'path': "D:\\React\\TTS\\new\\new_report_final\\public\\files\\NameAudio.mp3" },
        { 'path': "D:\\React\\TTS\\new\\new_report_final\\public\\files\\LevelAudio.mp3" },
        { 'path': "D:\\React\\TTS\\new\\new_report_final\\public\\files\\PerformanceAudio.mp3" },
        { 'path': "D:\\React\\TTS\\new\\new_report_final\\public\\files\\PerformanceSchoolAudio.mp3" },
        { 'path': "D:\\React\\TTS\\new\\new_report_final\\public\\files\\PerformanceDistrictAudio.mp3" },
        { 'path': "D:\\React\\TTS\\new\\new_report_final\\public\\files\\PerformanceStateAudio.mp3" }
    ]
    let GenerateAudio = [
        {
            'Text': req.firstName + req.lastName,
            'OutputFormat': 'mp3',
            'VoiceId': 'Joanna'
        },
        {
            'Text': req.level,
            'OutputFormat': 'mp3',
            'VoiceId': 'Joanna'
        },
        {
            'Text': req.performance,
            'OutputFormat': 'mp3',
            'VoiceId': 'Joanna'
        },
        {
            'Text': req.school,
            'OutputFormat': 'mp3',
            'VoiceId': 'Joanna'
        },
        {
            'Text': req.district,
            'OutputFormat': 'mp3',
            'VoiceId': 'Joanna'
        },
        {
            'Text': req.state,
            'OutputFormat': 'mp3',
            'VoiceId': 'Joanna'
        }
    ]

    try {
        const Polly = new AWS.Polly(pollyConfig);

        for (let i = 0; i < GenerateAudio.length; i++) {
            let params = GenerateAudio[i]
            Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err.code)
                } else if (data) {
                    if (data.AudioStream instanceof Buffer) {
                        fs.writeFile(oggPath[i].path, data.AudioStream, function (err) {
                            if (err) {
                                return console.log(err)
                            }
                            console.log("The file was saved!")
                        })
                        return data;
                    }
                }
            })
        }
    } catch (err) {
        console.log("Error ----->>>", err)
    }
}

module.exports.textToSpeech = textToSpeech;