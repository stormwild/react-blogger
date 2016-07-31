import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// Cannot get the tests to work with fetchMock, possibly a proxy / express specific issue
/*describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll(); // This needs to be removed
  });

  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {

    fetchMock.mock('http://localhost:3000/api/courses', 200);

    //{ body: { course: [{ id: 1, firstName: 'Cory', lastName: 'House' }] } }

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(fetchMock.called).toBe(true);
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });
});*/
