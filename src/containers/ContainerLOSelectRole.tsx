import React from 'react';
import { connect } from 'react-redux';

import { ScreenSelectRole } from '@/components/screens/ScreenLO';
import { UserRoles } from '@/constants/index';
import { appSlice } from '@/state/app';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  setRole(role: UserRoles): void {
    dispatch(appSlice.actions.setRole({ role }));
  },
});

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps, mapActionCreators)(ScreenSelectRole);
