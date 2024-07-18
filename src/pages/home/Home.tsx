import { useContext, useEffect, useRef, useState } from 'react';
import { TabListComponent } from '../examples/fluentUI/components/TablList';
import { ITabList } from '../examples/fluentUI/interfaces/ITabList';
import { TabValue } from '@fluentui/react-components';
import { ExampleBootstrap } from '../examples/bootstrap/ExampleBootstrap';
import { ExampleFluentUI } from '../examples/fluentUI/ExampleFluentUI';

const Home = () => {

    const [tabList, setTabList] = useState<TabValue>("bootstrap");

    const configTabList: ITabList = {
        tabs: [
            { key: 'bootstrap', value: 'Bootstrap 5.3' },
            { key: 'fluentUI', value: 'Fluent UI 9' }
        ],
        getSelectedValue(value) { setTabList(value) }
    }

    const handlerRenderContent = (): React.ReactNode => {
        switch (tabList) {
            case "bootstrap":
                return < ExampleBootstrap />
            case "fluentUI":
                return < ExampleFluentUI />
            default:
                return null
        }
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className="col-md-3">
                    <TabListComponent tabs={configTabList.tabs} getSelectedValue={configTabList.getSelectedValue} />
                </div>
                <div className="col-md-9">
                        {handlerRenderContent()}
                </div>
            </div>
        </div>
    );
}

export {
    Home
};