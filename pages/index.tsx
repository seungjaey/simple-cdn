import type { NextPage } from 'next'
import {
  Container,
  Box,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

const STATIC_IMAGE_LIST = [
  {
    name: 'example 1',
    path: 'a.jpg'
  },
  {
    name: 'example 2',
    path: 'b.jpg'
  }
]

const Home: NextPage = () => {
  return (
    <Container maxW='2xl' centerContent>
      <Accordion allowToggle width="100%">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                기본 - 정적 경로
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            display="flex"
            flexDirection="row"
          >
            {
              STATIC_IMAGE_LIST.map(({ name, path }) => (
                <Image
                  key={name}
                  src={`/${path}`}
                  alt={name}
                  width={200}
                  height={200}
                />
              ))
            }
          </AccordionPanel>
        </AccordionItem>
      </Accordion>


      <Accordion allowToggle width="100%">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                기본 - 정적 경로
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            display="flex"
            flexDirection="row"
          >
            {
              STATIC_IMAGE_LIST.map(({ name, path }) => (
                <Image
                  key={name}
                  src={`/api?path=${path}&format=webp&width=200&height=200`}
                  alt={name}
                  width={200}
                  height={200}
                />
              ))
            }
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  )
}

export default Home
