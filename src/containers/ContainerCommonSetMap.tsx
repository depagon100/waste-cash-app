import React from 'react';
import { connect } from 'react-redux';

import { ScreenSetMap } from '@/components/screens/ScreenCommon/ScreenSetMap';
import { setMapData } from '@/state/map/actions';
import { mapDataSelector } from '@/state/map/selectors';
import { AppDispatch, RootState } from '@/state/store';

const mapActionCreators = (dispatch: AppDispatch) => ({
  setMapData(mapData: Objects.Map): void {
    dispatch(setMapData(mapData));
  },
});

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps, mapActionCreators)(ScreenSetMap);
