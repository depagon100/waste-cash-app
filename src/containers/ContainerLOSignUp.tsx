import React from 'react';
import { connect } from 'react-redux';

import { ScreenSignUp } from '@/components/screens/ScreenLO';
import { UserRoles } from '@/constants/index';
import { roleSelector } from '@/state/app/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({});

const mapStateToProps = (state: RootState) => ({
  role: roleSelector(state) as UserRoles,
});

export default connect(mapStateToProps, mapActionCreators)(ScreenSignUp);
