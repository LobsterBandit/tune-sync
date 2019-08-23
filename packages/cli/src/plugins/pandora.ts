/* eslint-disable no-console */
import { PandoraService } from '@favtunes/pandora';
import { AxiosError } from 'axios';
import * as fs from 'fs';

export const pandora = async () => {
  const service = new PandoraService();

  try {
    const authResponse = await service.login(
      process.env.PANDORA_USER || 'unknown',
      process.env.PANDORA_PW || 'unknown',
    );
    fs.writeFileSync(
      './pandorauser.json',
      JSON.stringify(authResponse.data, null, 2),
    );

    const user = service.getUser();

    if (!user) {
      throw new Error('authentication failed');
    }

    const queryResponse = await service.getFeedback({
      pageSize: 50,
      startIndex: 0,
      webname: user.webname,
    });
    const feedback = [...queryResponse.data.feedback];
    if (feedback.length < queryResponse.data.total) {
      let pageCount = 1;
      let total = queryResponse.data.total;
      while (feedback.length < total) {
        const pageRes = await service.getFeedback({
          pageSize: 50,
          startIndex: feedback.length,
          webname: user.webname,
        });
        total = pageRes.data.total;
        feedback.push(...pageRes.data.feedback);
        pageCount++;
      }
      console.log(`Received ${pageCount} pages of feedback data`);
    }
    fs.writeFileSync('./response.json', JSON.stringify(feedback, null, 2));
  } catch (error) {
    const err: AxiosError = error;
    if (err.response) {
      console.log(`${err.response.status} - ${err.response.statusText}`);
      console.log(err.response.data);
      console.log(err.response.headers);
      console.log(err.config.headers);
      // fs.writeFileSync('./error.json', JSON.stringify(err.response.data));
    }
  }
};
