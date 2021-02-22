import fs from 'fs';

export async function createDJTestTmp() {
  fs.copyFileSync('./src/test/CLINIC_TIMES_TEST.json', './src/test/CLINIC_TIMES_TEST_TMP.json');
}

export function deleteDJTestTmp() {
  fs.unlinkSync('./src/test/CLINIC_TIMES_TEST_TMP.json');
}
