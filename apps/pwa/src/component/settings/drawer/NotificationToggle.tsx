import CustomToggleButton, { CustomToggleButtonProps } from '@/theme/CustomToggleButton';
import { handleNotificationSubscription } from '@/utils/handleNotification';

export const NotificationToggle = () => {

	const property : CustomToggleButtonProps= {
		initialState: false,
		label: 'Enable Notifications',
		direction: 'row' as const,
		onToggleFunction: handleNotificationSubscription
	};

	return <CustomToggleButton {...property} />;
};
