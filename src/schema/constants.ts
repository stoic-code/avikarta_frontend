export const PHONE_REGEX = /^\d{10}$/;
export const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;
export const VALID_DATE =
  /^(\d{4}|[\u0966-\u096F]{4})-(0[1-9]|1[0-2]|[\u0966-\u096F]|१[०१२])-(0[1-9]|[12][0-9]|3[01]|[\u0966-\u096F]{1,2}|१[०१२]|[१२][०१२])$/;
export const VALID_WARD =
  /^(?:\d|[0-9][\u0966-\u096F]|\d{2}|[\u0966-\u096F]{1,2})$/;
export const VALID_INDEX =
  /^(?:\d|[0-9][\u0966-\u096F]|\d{2}|[\u0966-\u096F]{1,2})$/;
export const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export const NEPALI_REGEX = /^[\u0900-\u097F\s]+$/;
export const NUMBER_REGEX = /^-?\d*\.?\d+$/;
export const MIN_STRING = /^(?!\s*$).+/;
export const YOUTUBE_URL = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+/;
export const ACCEPTED_FILE_TYPES = ['application/pdf'];
