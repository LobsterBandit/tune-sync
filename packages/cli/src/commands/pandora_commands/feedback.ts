/* eslint-disable no-console */
import { PandoraService } from '@tune-sync/pandora';
import { AxiosError } from 'axios';

export type PandoraFeedbackArgs = {
  webname: string;
};

exports.command = 'feedback';
exports.desc = 'Get pandora track feedback';
exports.builder = {};
exports.handler = async function pandoraFeedback() {
  try {
    const service = new PandoraService();

    console.log(`Getting pandora track feedback`);

    const feedbackResponse = await service.getFeedback();
    const feedback = feedbackResponse.data.feedback;
    const feedbackTotal = feedbackResponse.data.total;

    if (feedback.length < feedbackTotal) {
      let pageCount = 1;
      let total = feedbackTotal;

      while (feedback.length < total) {
        const pageRes = await service.getFeedback({
          pageSize: 50,
          startIndex: feedback.length,
        });

        total = pageRes.data.total;
        feedback.push(...pageRes.data.feedback);
        pageCount++;
      }

      console.log(
        `Received ${feedback.length} feedback records in ${pageCount} pages of data`,
      );
    }

    const outputFile = await service.writeOutput(
      'pandora_feedback.json',
      JSON.stringify(feedback, null, 2),
    );

    console.log(`Wrote feedback to ${outputFile}`);
  } catch (error) {
    const err: AxiosError = error;

    if (err.response) {
      console.log(`${err.response.status} - ${err.response.statusText}`);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    console.log('Headers', err.config.headers);
    console.log('Data', err.config.data);
  }
};
