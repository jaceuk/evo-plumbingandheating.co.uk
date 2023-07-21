import PlumbingImage from '../images/bg-plumbing.jpg';
import BlockedSinksToiletsImage from '../images/bg-blocked-sinks-toilets.jpg';
import CentralHeatingImage from '../images/bg-central-heating.jpg';
import BoilerServicingRepairsImage from '../images/bg-boiler-servicing-repairs.jpg';
import PowerFlushingImage from '../images/bg-power-flushing.jpg';
import GutterCleaningImage from '../images/bg-gutter-cleaning.jpg';
import PatioCleaningImage from '../images/bg-patio-cleaning.jpg';
import RoofCleaningImage from '../images/bg-roof-cleaning.jpg';
import HomeImage from '../images/bg-home.jpg';

export function getHeroImage(serviceSlug: string): ImageMetadata {
	if (serviceSlug === 'plumbing') return PlumbingImage;
	if (serviceSlug === 'blocked-sinks-toilets') return BlockedSinksToiletsImage;
	if (serviceSlug === 'central-heating') return CentralHeatingImage;
	if (serviceSlug === 'boiler-servicing-repairs') return BoilerServicingRepairsImage;
	if (serviceSlug === 'power-flushing') return PowerFlushingImage;
	if (serviceSlug === 'gutter-cleaning') return GutterCleaningImage;
	if (serviceSlug === 'patio-cleaning') return PatioCleaningImage;
	if (serviceSlug === 'roof-cleaning') return RoofCleaningImage;

	return HomeImage;
}
