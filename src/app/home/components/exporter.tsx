import { ReactNode, useState } from 'react';
import type { TabsProps } from 'antd';
import { Button, Drawer, Tabs, Input, notification } from 'antd';
import { UploadOutlined, ExportOutlined, ImportOutlined, CopyOutlined, SaveOutlined } from '@ant-design/icons';
import { Player } from '../../../types';
import { Exception } from 'sass';
import { savePlayerToStorage } from '../../../utilities';
import { useCopyToClipboard } from '../../../hooks';

const { TextArea } = Input;

/* Interface */
interface Props {
    players: Player[],
}

interface ExportProps {
    players: Player[],
}

interface ImportProps {
    importData: string,
    setImportData: React.Dispatch<React.SetStateAction<string>>,
}

interface OperationResult {
    text: string | null,
    icon: ReactNode | null,
    type: 'primary' | 'default',
    onClick: React.MouseEventHandler<HTMLElement> | undefined
}

interface ItemProps {
    players: Player[],
    importData: string,
    setImportData: React.Dispatch<React.SetStateAction<string>>,
}

enum TabIndex {
    Export = 'export',
    Import = 'import',
    Other = 'other'
}

/* Data */
const items: (props: ItemProps) => TabsProps['items'] = (props: ItemProps) => {
    return [
        {
            key: TabIndex.Export,
            label: 'Export',
            icon: <ExportOutlined />,
            children: <ExportTab players={props.players} />
        },
        {
            key: TabIndex.Import,
            label: 'Import',
            icon: <ImportOutlined />,
            children: <ImportTab importData={props.importData} setImportData={props.setImportData} />,
        },
    ];
};

/* Tab Components */
function ExportTab(props: ExportProps) {
    return <TextArea rows={30} value={JSON.stringify(props.players, null, '\t')} />;
}

function ImportTab(props: ImportProps) {
    const { importData, setImportData } = props;
    return <TextArea rows={30} value={importData} onChange={e => setImportData(e.target.value)} />;
}

/* Main Component */
function Exporter(props: Props) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<string>(TabIndex.Export);
    const [api, contextHolder] = notification.useNotification();
    const [importData, setImportData] = useState<string>('');
    const [, copy] = useCopyToClipboard()

    function submitData(_event: React.MouseEvent<HTMLElement, MouseEvent>) {
        try {
            const object = JSON.parse(importData);
            console.log("obj ccc ", typeof object, " aidjas ", object);
            try {
                var players = object as Player[];
                if (players) {
                    console.log("ngon ", typeof players, " aidjas ", players);
                    for (const player of players) {
                        savePlayerToStorage(player);
                    }
                    openNotification("Tuyệt vời ông mặt trời");
                    onClose();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            }
            catch {
                openErrorNotification("Something went wrong!");
            }
        }
        catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            if (error instanceof Exception) message = "Something went wrong, please update your data and try again";
            else message = String(error);

            openErrorNotification(`Wrong JSON format: ${message}`);
        }

    }

    function copyData(_event: React.MouseEvent<HTMLElement, MouseEvent>) {
        let text = JSON.stringify(props.players, null, '\t');
        if (text && text.length > 0) {
            copy(text)
            .then(() => {
                openNotification("Copied to your clipboard");
            })
            .catch(error => {
                console.error('Failed to copy!', error);
                openErrorNotification("Can not write to clipboard");
            });
        }
    }

    const operationConfiguration = (): OperationResult => {
        if (mode === TabIndex.Export) {
            return {
                text: "Copied",
                icon: <CopyOutlined />,
                type: 'default',
                onClick: copyData
            };
        }
        else if (mode === TabIndex.Import) {
            return {
                text: "Submit",
                icon: <SaveOutlined />,
                type: 'primary',
                onClick: submitData
            };
        }
        else {
            return {
                text: null,
                icon: null,
                type: 'default',
                onClick: undefined
            };
        }
    }

    const openNotification = (text: string) => {
        api.success({
            message: text,
            placement: 'bottom',
        });
    };

    const openErrorNotification = (error: string) => {
        api.error({
            message: error,
            placement: 'bottom',
        });
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const operation = () => {
        const { text, icon, type, onClick } = operationConfiguration();
        return (
            <Button
                icon={icon}
                type={type}
                onClick={onClick}
            >
                {text}
            </Button>
        );
    };

    return (
        <>
            {contextHolder}
            <Button
                className='mt-[16px]'
                type='default'
                icon={<UploadOutlined />}
                onClick={showDrawer}
            >
                Export / Import
            </Button>
            <Drawer title="Import/Export" size='large' onClose={onClose} open={open}>
                <Tabs
                    defaultActiveKey={TabIndex.Export}
                    items={items({
                        players: props.players,
                        importData,
                        setImportData,
                    })}
                    tabBarExtraContent={operation()}
                    onChange={setMode}
                />
            </Drawer>
        </>
    );
}

export default Exporter;