import { Injectable, Logger } from '@nestjs/common';
import { NewRaceDto } from './dto/new-race.dto';
import { MailerService } from '@nestjs-modules/mailer';
import NEW_RACE_NOTIFICATION_HTML from './static/notification-html';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(payload: NewRaceDto): Promise<void> {
    const {
      driverName,
      driverEmail,
      raceName,
      raceDate,
      raceStartTime,
      raceEndTime,
      raceLaps,
    } = payload;
    this.logger.log(`Sending e-mail to ${driverName}`);

    let markup = NEW_RACE_NOTIFICATION_HTML;
    markup = markup.replace(/#DRIVER_NAME/, driverName);
    markup = markup.replace(/#RACE_NAME/, raceName);
    markup = markup.replace(/#RACE_DATE/, raceDate);
    markup = markup.replace(/#RACE_START_TIME/, raceStartTime);
    markup = markup.replace(/#RACE_END_TIME/, raceEndTime);
    markup = markup.replace(/#RACE_LAPS/, '' + raceLaps);

    await this.mailerService.sendMail({
      from: `Race Engineering App <${process.env.NOTIFICATION_EMAIL}>`,
      to: driverEmail,
      subject: 'PORSCHE CARRERA CUP - Nova Corrida',
      html: markup,
    });

    this.logger.log(`E-mail successfully sent to ${driverName}!`);
  }
}
