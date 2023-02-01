import {useEffect, useState} from "react";

import "@cloudscape-design/global-styles/index.css"
import {Box, Button, SpaceBetween, Table} from "@cloudscape-design/components"
import Header from "@cloudscape-design/components/header";
import { Storage } from 'aws-amplify';

const columnDefinitions = [
    {
        id: 'key',
        cell: item => item.key,
        header: 'Filename',
    },
    {
        id: 'size',
        header: 'Size',
        cell: item => (item.size / 1024 / 1024).toFixed(2) + " MB",
        minWidth: 10,
    },
    {
        id: 'lastModified',
        header: 'Last Modified',
        cell: item => item.lastModified.toString(),
    },
];

function TableListFiles(props) {

    const [items, setItems] = useState();
    const [selectedItems, setSelectedItems] = useState([]);

    const load = async () => {
        Storage.list('', {level: props.level})
            .then(
                result => {
                    setItems(result.results);
                }
            )
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        load();
    }, []);

    function downloadFile(filename) {
        Storage.get(filename, {
            level: props.level
        }).then(
            (result) => {
                openInNewTab(result);
            }
        )
    }

    function deleteFile(filename) {
        Storage.remove(filename, { level: props.level }).then(
            (ok) => {
                load().then(
                    // alert("File deleted.")
                );
            }
        ).catch( (error) => {
            console.log(error);
        } );
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <Table
            items={items}
            // resizableColumns
            columnDefinitions={columnDefinitions}
            onSelectionChange={({detail}) =>
                setSelectedItems(detail.selectedItems)
            }
            header={
                <Header
                    actions={
                        <SpaceBetween size="xs" direction="horizontal">
                            <Button onClick={ () => load() }>Refresh</Button>
                            <Button disabled={selectedItems.length == 0} onClick={ () => downloadFile(selectedItems[0].key) }>Download</Button>
                            <Button disabled={selectedItems.length == 0} onClick={ () => deleteFile(selectedItems[0].key) }>Delete</Button>
                        </SpaceBetween>
                    }
                >

                </Header>
            }
            selectionType="single"
            selectedItems={selectedItems}
            empty={
                <Box margin={{vertical: 'xs'}} textAlign="center" color="inherit">
                    <SpaceBetween size="xxs">
                        <div>
                            <b>No files uploaded yet</b>
                            <Box variant="p" color="inherit">
                                You don't have any files uploaded yet.
                            </Box>
                        </div>
                    </SpaceBetween>
                </Box>
            }
        />
    );

}

export default TableListFiles;
