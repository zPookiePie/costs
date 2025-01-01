import { parse, v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
    const {id} = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() =>{
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.service)
            })
            .catch((err) => console.log)
        }, 2000)
    }, [id])

    function editPost(project) {
        setMessage('')

        //validação budget
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('sucess')
            return false
        })
        .catch((err) => console.log(err))
    }

    function createService(project) {
        setMessage('')

        const lastService= project.service[project.service.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //validação do valor máximo
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.service.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false)
        })
        .catch((err) => console.log(err))
    }

    function removeService(id, cost) {

        const servicesUpdated = project.service.filter(
            (service) => service.id !== id
        );

        const projectUpdated = {
            ...project,
            service: servicesUpdated,
            cost: parseFloat(project.cost) - parseFloat(cost),
        };

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Erro ao atualizar o projeto no servidor.')
                }
                return resp.json();
            })
            .then((data) => {
                setProject(data)
                setServices(servicesUpdated)
                setMessage('Serviço removido com sucesso!')
            })
            .catch((err) => {
                console.error('Erro ao remover o serviço:', err)
            });
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
            <div className={styles.container}>
        <>
            {
                project.name ? (
                    <div className={styles.project_details}>
                        <Container customClass="column">
                            {message && <Message type={type} msg={message} />}
                            <div className={styles.details_container}>
                                <h1>Projeto: {project?.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                                </button>
                                {!showProjectForm ? (
                                    <div className={styles.project_info}>
                                        <p><span>
                                            Categoria:
                                        </span> {project.category.name}</p>
                                        <p><span>Total de Orçamento:
                                        </span> R${project.budget}</p>
                                        <p><span>Total Utilizado:
                                        </span> R${project.cost}</p>
                                    </div>
                                ) : (
                                    <div className={styles.project_info}>
                                        <ProjectForm
                                            handleSubmit={editPost}
                                            btnText="Concluir edição"
                                            projectData={project}
                                        />
                                    </div>)}
                            </div>
                            <div className={styles.service_form_container}>
                                    <h2>Adicione um serviço:</h2>
                                    <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                                </button>
                                <div className={styles.project_info}>
                                    {showServiceForm && (
                                        <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={project}
                                        />
                                    )}
                                </div>
                            </div>
                            <h2>Serviços</h2>
                            <Container customClass="start">
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))
                                }
                                {services.length === 0 && <p>Não há serviços cadastrados</p>}
                            </Container>
                        </Container>
                    </div>
                ): (
                    <Loading/>
                )
            }
        </>
        </div>
    )
}

export default Project