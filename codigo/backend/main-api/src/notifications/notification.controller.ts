import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NewRaceDto } from './dto/new-race.dto';

@Controller()
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  constructor(private readonly service: NotificationService) {}

  @EventPattern('race-created')
  async handleSendEmail(
    @Payload() payload: NewRaceDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    this.logger.log('Sending e-mail...');
    await this.ackMessage(context);
    return await this.service.sendMail(payload);
  }

  private async ackMessage(context: RmqContext): Promise<void> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    await channel.ack(message);
  }
}
