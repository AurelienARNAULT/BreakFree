using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoundManager : MonoBehaviour
{

    public static SoundManager Instance;

    [SerializeField] private AudioSource audioSource;

    [SerializeField] private AudioClip ObjectRetrieved;

    [SerializeField] private AudioClip riddleFinished;

    [SerializeField] private AudioClip riddleStep;

    [SerializeField] private AudioClip wrongObject;

    void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

    public void PlayObjectRetrieved()
    {
        PlaySound(ObjectRetrieved);
    }

    public void PlaySound(AudioClip clip)
    {
        audioSource.PlayOneShot(clip);
    }

    public void PlayRiddleFinished()
    {
        PlaySound(riddleFinished);
    }

    public void PlayRiddleStep()
    {
        PlaySound(riddleStep);
    }

    public void PlayWrongObject()
    {
        PlaySound(wrongObject);
    }    

}

