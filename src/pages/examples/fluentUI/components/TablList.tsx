import { SelectTabData, SelectTabEvent, Tab, TabList, TabValue, Title3, makeStyles } from '@fluentui/react-components';
import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ITabList } from '../interfaces/ITabList';
import { tab } from '@testing-library/user-event/dist/tab';

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "50px 20px",
    rowGap: "20px",
  },
});

const TabListComponent = ({ tabs, getSelectedValue }: ITabList) => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<TabValue>(tabs[0].key);
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
    getSelectedValue(data.value);
    console.log(data.value)
  };

  return (
    <div className={styles.root}>
      <Title3>Examples</Title3>
      <TabList selectedValue={selectedValue} vertical onTabSelect={onTabSelect} >
        {/* <Tab value="boostrap">Bootstrap 5.3</Tab>
        <Tab value="fluent-ui">Fluent UI 9</Tab> */}
        {
          tabs.map((item) => (
            <Tab value={item.key} key={crypto.randomUUID()}>{item.value}</Tab>
          ))
        }
        {/* <Tab value="tab3">Third Tab</Tab> */}
        {/* <Tab value="tab4">Fourth Tab</Tab> */}
      </TabList>
    </div>
  );
}

export {
  TabListComponent
};