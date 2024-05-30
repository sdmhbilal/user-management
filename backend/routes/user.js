import express from 'express';

import {
  AddUser,
  DeleteUser,
  GetUser,
  GetUsers,
  UpdateUser
} from '../controllers/user';

import { API_ENDPOINTS } from './utils/constants';
import {
  CatchResponse,
  SuccessResponse
} from './utils/helpers';

const router = express.Router();

// Route to add a new user
router.post(API_ENDPOINTS.USER.DEFAULT, async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const { message } = await AddUser({
      name,
      email,
      password
    });

    SuccessResponse({
      res,
      message
    });
  } catch (err) {
    CatchResponse({
      res,
      err
    });
  }
});

// Route to get all users
router.get(API_ENDPOINTS.USER.DEFAULT, async (req, res) => {
  try {
    const {
      limit,
      skip
    } = req.query;

    const { users, total } = await GetUsers({
      limit: Number(limit),
      skip: Number(skip)
    });

    SuccessResponse({
      res,
      users,
      total
    });
  } catch (err) {
    console.log('\n\n', 'err', err);
    CatchResponse({
      res,
      err
    });
  }
});

// Route to get a specific user by ID
router.get(API_ENDPOINTS.USER.GET_USER, async (req, res) => {
  try {
    const {
      userId
    } = req.params;

    const { user } = await GetUser({
      userId: Number(userId)
    });

    SuccessResponse({
      res,
      user
    });
  } catch (err) {
    CatchResponse({
      res,
      err
    });
  }
});

// Route to update a user's information
router.put(API_ENDPOINTS.USER.UPDATE_USER, async (req, res) => {
  try {
    const {
      userId
    } = req.params;

    const {
      name,
      email
    } = req.body;

    const { message } = await UpdateUser({
      userId,
      name,
      email
    });

    SuccessResponse({
      res,
      message
    });
  } catch (err) {
    CatchResponse({
      res,
      err
    });
  }
});

// Route to delete a user by ID
router.delete(API_ENDPOINTS.USER.DELETE_USER, async (req, res) => {
  try {
    const {
      userId
    } = req.params;

    const { message } = await DeleteUser({
      userId
    });

    SuccessResponse({
      res,
      message
    });
  } catch (err) {
    CatchResponse({
      res,
      err
    });
  }
});

export default router;
