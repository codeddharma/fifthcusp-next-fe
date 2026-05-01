// Cloudinary URL builder (client-safe — no server SDK)
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''

interface CloudinaryOptions {
  width?: number
  height?: number
  crop?: string
  quality?: string | number
}

export const getCloudinaryImage = (publicId: string, options: CloudinaryOptions = {}): string => {
  const transforms: string[] = []
  if (options.width) transforms.push(`w_${options.width}`)
  if (options.height) transforms.push(`h_${options.height}`)
  if (options.crop) transforms.push(`c_${options.crop}`)
  if (options.quality) transforms.push(`q_${options.quality}`)
  const t = transforms.length ? `${transforms.join(',')}/` : ''
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}${publicId}`
}

export const Images = {
  home: {
    aboutUs: getCloudinaryImage('about-astro_yybljn', { width: 800, crop: 'fill' }),
    languages: {
      astrology: getCloudinaryImage('astrology_cq4x9v', { width: 400, crop: 'fill' }),
      vastu: getCloudinaryImage('vastu-space_abc123', { width: 400, crop: 'fill' }),
      numerology: getCloudinaryImage('numerology_xyz456', { width: 400, crop: 'fill' }),
      energy: getCloudinaryImage('energy-reading_lmn789', { width: 400, crop: 'fill' }),
      tarot: getCloudinaryImage('tarot-questions_pqr234', { width: 400, crop: 'fill' }),
      manifestation: getCloudinaryImage('manifestation_align_def567', { width: 400, crop: 'fill' }),
    },
  },
  services: {
    energy: getCloudinaryImage('energy-service_001', { width: 800, crop: 'fill' }),
    movement: getCloudinaryImage('movement-service_002', { width: 800, crop: 'fill' }),
    spaceVastu: getCloudinaryImage('space-vastu-service_003', { width: 800, crop: 'fill' }),
    manifestation: getCloudinaryImage('manifestation-service_004', { width: 800, crop: 'fill' }),
    material: getCloudinaryImage('material-service_005', { width: 800, crop: 'fill' }),
  },
  blogs: {
    blog1: getCloudinaryImage('blog1_001', { width: 600, crop: 'fill' }),
    blog2: getCloudinaryImage('blog2_002', { width: 600, crop: 'fill' }),
    blog3: getCloudinaryImage('blog3_003', { width: 600, crop: 'fill' }),
  },
}
