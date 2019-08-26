/* eslint-disable no-console */
import * as fs from 'fs';
import yargs, { Arguments } from 'yargs';
import { PandoraService } from '@tune-sync/pandora';
import { PandoraLoginArgs } from '../../plugins';
import { AxiosError } from 'axios';

export type PandoraFeedbackArgs = {
  webname: string;
};

exports.command = 'feedback';
exports.desc = 'Get pandora track feedback';
exports.builder = function pandoraFeedbackBuilder(yargBuilder: yargs.Argv) {
  return yargBuilder.options({
    u: {
      alias: 'username',
      type: 'string',
      demandOption: true,
      describe: 'pandora password',
    },
    p: {
      alias: 'password',
      type: 'string',
      demandOption: true,
      describe: 'pandora password',
    },
  });
};
exports.handler = async function pandoraFeedback(
  argv: Arguments<PandoraLoginArgs>,
) {
  try {
    const service = new PandoraService();
    console.log(`Logging in...`);
    await service.login(argv.username, argv.password);

    const user = service.getUser();
    if (!user) {
      throw new Error('Authentication failed!');
    }

    console.log(`Getting feedback for user: ${argv.username}`);
    const feedbackResponse = await service.getFeedback({
      webname: user.webname,
      pageSize: 50,
      startIndex: 0,
    });
    const feedback = feedbackResponse.data.feedback;
    const feedbackTotal = feedbackResponse.data.total;

    if (feedback.length < feedbackTotal) {
      let pageCount = 1;
      let total = feedbackTotal;
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
      console.log(
        `Received ${feedback.length} feedback records in ${pageCount} pages of data`,
      );
    }

    fs.writeFileSync(
      './pandora_feedback.json',
      JSON.stringify(feedback, null, 2),
    );
    console.log('Wrote feedback to ./pandora_feedback.json');
  } catch (error) {
    const err: AxiosError = error;
    if (err.response) {
      console.log(`${err.response.status} - ${err.response.statusText}`);
      console.log(err.response.data);
    }
  }
};
