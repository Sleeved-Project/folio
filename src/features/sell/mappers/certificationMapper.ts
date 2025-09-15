import { Certification, CertificationInputDTO } from '../hooks/mutations/useCertificate';

export function mapCertificationInputDTOToCertification(
  response: CertificationInputDTO
): Certification {
  return {
    id: response.id,
    globalRate: response.globalRating,
    label: response.grade.label,
    certifiedAt: response.certifiedAt,
    centeringRate: response.centeringRating,
    cornerRate: response.cornerRating,
    edgeRate: response.edgeRating,
    surfaceRate: response.surfaceRating,
    description: response.grade.description,
  };
}
