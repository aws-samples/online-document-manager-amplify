import {useEffect, useState} from "react";

import "@cloudscape-design/global-styles/index.css"
import {
    Button,
    Container,
    ExpandableSection, Flashbar,
    Form,
    FormField, Grid, Header, Input, PieChart,
    ProgressBar,
    SpaceBetween, Table, TokenGroup
} from "@cloudscape-design/components"

import {Amplify, Storage} from 'aws-amplify';
import {Predictions, AmazonAIPredictionsProvider} from '@aws-amplify/predictions';

Amplify.addPluggable(new AmazonAIPredictionsProvider());

function UploadFileCard(props) {

    const [filename, setFilename] = useState();
    const [progress, setProgress] = useState();
    const [uploaded, setUploaded] = useState(false);

    const [identify, setIdentify] = useState();
    const [interpret, setInterpret] = useState();
    const [identifyErr, setIdentifyErr] = useState(null);
    const [keyValueTokenGroup, setKeyValueTokenGroup] = useState();
    const [firstLinesTokenGroup, setFirstLinesTokenGroup] = useState();


    async function onChange(e) {
        setProgress(0);
        const file = e.target.files[0];
        setFilename(file.name);

        try {
            var response = await Storage.put(file.name, file, {
                progressCallback(progress) {
                    setProgress(progress.loaded * 100 / progress.total);
                },
                level: props.level,
                useAccelerateEndpoint: true
            });
            setUploaded(true);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }

        var responseIdentify = await onIdentify(file);
        var responseInterpret = await onInterpret(responseIdentify.text.fullText);

    }

    async function onIdentify(file) {

        try {
            var respPrediction = await Predictions.identify({
                text: {
                    source: {
                        file
                    }
                }
            });

            setIdentify(respPrediction);
            console.log(respPrediction);

            var keyValuesGroupArray = [];
            var firstLinesGroupArray = [];

            respPrediction.text.keyValues.forEach(
                (each) => {
                    keyValuesGroupArray.push({
                        label: each.key,
                        // dismissLabel: "Remove"
                    })
                }
            );

            for (var i = 0; i < Math.min(5, respPrediction.text.lines.length); i++) {
                firstLinesGroupArray.push({
                    label: "Line " + i + ": " + respPrediction.text.lines[i],
                })
            }

            setKeyValueTokenGroup(keyValuesGroupArray);
            setFirstLinesTokenGroup(firstLinesGroupArray);
            setIdentifyErr(null);

            return respPrediction;


        } catch (error) {
            console.log("Error uploading file: ", error);

            setIdentify();
            setKeyValueTokenGroup();
            setFirstLinesTokenGroup();
            setIdentifyErr({
                header: "Text identification data error - No valid data",
                type: "error",
                content: "This function only works for PDF files.",
                id: "message_error"
            });

            return null;

        }

    }

    async function onInterpret(fullText) {

        try {
            var respPredictions = await Predictions.interpret({
                text: {
                    source: {
                        text: fullText,
                    },
                    type: "ALL"
                }
            });

            setInterpret(respPredictions);
        } catch (e) {
            console.log(e);
        }

    }

    function retrieveItems(){
        var textEntitiesArray = [];
        var aMap = {};

        interpret.textInterpretation.textEntities.forEach(
            (each) => {
                aMap[each.type] ??= [];
                aMap[each.type].push(each.text);
            }
        );

        for (let key in aMap) {
            textEntitiesArray.push({
                'type' : key,
                'text' : aMap[key].join(', '),
            })
        }

        return textEntitiesArray;
    }

    return (
        <Container>
            <SpaceBetween size="l">

                <ProgressBar
                    value={progress}
                    label={filename === undefined ? "Click in the button to upload a file" : "Uploading file " + filename}
                />

                <div>
                    <input accept="*/*" id="icon-button-file" type="file" onChange={onChange}
                           style={{display: "none"}}/>

                    <Button>
                        <label htmlFor="icon-button-file">
                            Upload new file
                        </label>
                    </Button>

                    {/*<Button onClick={() => {*/}
                    {/*    console.log(identify)*/}
                    {/*}}>*/}
                    {/*    Identify*/}
                    {/*</Button>*/}

                    {/*<Button onClick={() => {*/}
                    {/*    console.log(interpret)*/}
                    {/*}}>*/}
                    {/*    Interpret*/}
                    {/*</Button>*/}

                    {/*<Button onClick={() => {*/}
                    {/*    retrieveItems()*/}
                    {/*}}>*/}
                    {/*    retrieveItems*/}
                    {/*</Button>*/}



                </div>

                {
                    identify == null || identify === undefined ?
                        <></> :
                        <ExpandableSection headerText="Identify text (available only for documents)">
                            <Form>
                                <Grid gridDefinition={
                                    [{colspan: 2}, {colspan: 2}, {colspan: 2}, {colspan: 2}, {colspan: 2}, {colspan: 12}, {colspan: 12}, {colspan: 12}, {colspan: 12}, {colspan: 12}, {colspan: 12}, {colspan: 12}, {colspan: 12}]
                                }>

                                    <FormField label="Key values">
                                        <Input
                                            disabled
                                            value={identify == undefined ? "" : identify.text.keyValues.length}
                                        />
                                    </FormField>
                                    <FormField label="Lines">
                                        <Input
                                            disabled
                                            value={identify == undefined ? "" : identify.text.lines.length}
                                        />
                                    </FormField>
                                    <FormField label="Selections">
                                        <Input
                                            disabled
                                            value={(identify == undefined || identify.text.selections == undefined) ? "" : identify.text.selections.length}
                                        />
                                    </FormField>
                                    <FormField label="Tables">
                                        <Input
                                            disabled
                                            value={(identify == undefined || identify.text.tables == undefined) ? "" : identify.text.tables.length}
                                        />
                                    </FormField>
                                    <FormField label="Words">
                                        <Input
                                            disabled
                                            value={identify == undefined ? "" : identify.text.words.length}
                                        />
                                    </FormField>

                                    <Header variant="h5">
                                        Key Values found
                                    </Header>
                                    <TokenGroup
                                        items={keyValueTokenGroup}
                                    />

                                    <Header variant="h5">
                                        First lines found
                                    </Header>
                                    <TokenGroup
                                        items={firstLinesTokenGroup}
                                    />

                                    {
                                        interpret == null || interpret === undefined ?
                                            <></> :
                                            <>
                                                <Header variant="h5">
                                                    Sentiment
                                                </Header>
                                                <PieChart
                                                    data={[
                                                        {
                                                            title: "Mixed",
                                                            value: interpret.textInterpretation.sentiment.mixed.toFixed(3) * 100,
                                                        },
                                                        {
                                                            title: "Negative",
                                                            value: interpret.textInterpretation.sentiment.negative.toFixed(3) * 100,
                                                        },
                                                        {
                                                            title: "Neutral",
                                                            value: interpret.textInterpretation.sentiment.neutral.toFixed(3) * 100,
                                                        },
                                                        {
                                                            title: "Positive",
                                                            value: interpret.textInterpretation.sentiment.positive.toFixed(3) * 100,
                                                        }
                                                    ]}
                                                    hideFilter
                                                    detailPopoverContent={(datum, sum) => [
                                                        {key: "Value", value: datum.value},
                                                        {
                                                            key: "Percentage",
                                                            value: datum.value.toFixed(2) + " %"
                                                        },
                                                    ]}
                                                />

                                                <Table
                                                    columnDefinitions={[
                                                        {
                                                            id: "type",
                                                            header: "Type",
                                                            cell: item => item.type || "-",
                                                        },
                                                        {
                                                            id: "text",
                                                            header: "Labels found",
                                                            cell: item => item.text || "-",
                                                        },
                                                    ]}
                                                    items={retrieveItems()}
                                                    loadingText="Loading resources"
                                                    sortingDisabled
                                                    variant="embedded"
                                                />
                                            </>
                                    }

                                </Grid>
                            </Form>
                        </ExpandableSection>
                }

            </SpaceBetween>
        </Container>
    );

}

export default UploadFileCard;
