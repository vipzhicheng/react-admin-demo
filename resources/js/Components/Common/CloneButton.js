import React from 'react'
import { Button, Link } from 'react-admin';
import ContentClone from '@material-ui/icons/Forward';

const CloneButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: '/pages/create',
            state: { record: Object.assign({}, record, {
              admin_title: `Clone of ${record.admin_title}`,
              status: '0'
            }) },
        }}
        label="Clone"
    >
        <ContentClone />
    </Button>
);

export default CloneButton
